using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentResultManagement.Data;
using StudentResultManagement.DTOs;
using StudentResultManagement.Models;
namespace StudentResultManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin,Teacher")]
    public class ResultController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ResultController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/result
        [HttpGet]
        public async Task<IActionResult> GetAllResults()
        {
            var results = await _context.Results
                .Include(r => r.Student)
                .Include(r => r.Subject)
                .Select(r => new ResultDTO
                {
                    Id = r.Id,
                    StudentId = r.StudentId,
                    StudentName = r.Student.FirstName + " " + r.Student.LastName,
                    SubjectId = r.SubjectId,
                    SubjectCode = r.Subject.Code,
                    Marks = (int)r.Marks,
                    Grade = r.Grade,
                    CreatedAt = r.CreatedAt
                })
                .ToListAsync();

            return Ok(results);
        }

        // GET: api/result/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetResultById(int id)
        {
            var result = await _context.Results
                .Include(r => r.Student)
                .Include(r => r.Subject)
                .Where(r => r.Id == id)
                .Select(r => new ResultDTO
                {
                    Id = r.Id,
                    StudentId = r.StudentId,
                    StudentName = r.Student.FirstName + " " + r.Student.LastName,
                    SubjectId = r.SubjectId,
                    SubjectCode = r.Subject.Code,
                    Marks = (int)r.Marks,
                    Grade = r.Grade,
                    CreatedAt = r.CreatedAt
                })
                .FirstOrDefaultAsync();

            if (result == null)
                return NotFound("Result not found.");

            return Ok(result);
        }

        // POST: api/result
        [HttpPost]
        public async Task<IActionResult> CreateResult([FromBody] ResultDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = new Result
            {
                StudentId = dto.StudentId,
                SubjectId = dto.SubjectId,
                Marks = dto.Marks,
                Grade = dto.Grade,
                CreatedAt = DateTime.UtcNow
            };

            _context.Results.Add(result);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Result created successfully." });
        }

        // PUT: api/result/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateResult(int id, [FromBody] ResultDTO dto)
        {
            var result = await _context.Results.FindAsync(id);
            if (result == null)
                return NotFound("Result not found.");

            result.StudentId = dto.StudentId;
            result.SubjectId = dto.SubjectId;
            result.Marks = dto.Marks;
            result.Grade = dto.Grade;

            _context.Results.Update(result);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Result updated successfully." });
        }

        // DELETE: api/result/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResult(int id)
        {
            var result = await _context.Results.FindAsync(id);
            if (result == null)
                return NotFound("Result not found.");

            _context.Results.Remove(result);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Result deleted successfully." });
        }

        // GET: api/result/filter?studentId=1&subjectId=2
        [HttpGet("filter")]
        public async Task<IActionResult> GetResultsByFilter([FromQuery] int? studentId, [FromQuery] int? subjectId)
        {
            var query = _context.Results
                .Include(r => r.Student)
                .Include(r => r.Subject)
                .AsQueryable();

            if (studentId.HasValue)
                query = query.Where(r => r.StudentId == studentId.Value);

            if (subjectId.HasValue)
                query = query.Where(r => r.SubjectId == subjectId.Value);

            var results = await query
                .Select(r => new ResultDTO
                {
                    Id = r.Id,
                    StudentId = r.StudentId,
                    StudentName = r.Student.FirstName + " " + r.Student.LastName,
                    SubjectId = r.SubjectId,
                    SubjectCode = r.Subject.Code,
                    Marks = (int)r.Marks,
                    Grade = r.Grade,
                    CreatedAt = r.CreatedAt
                })
                .ToListAsync();

            return Ok(results);
        }

        // GET: api/result/student-summary/{studentId}
        [HttpGet("student-summary")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> GetStudentResultSummary([FromQuery] string firstName, [FromQuery] string lastName)
        {
            var student = await _context.Students
                .FirstOrDefaultAsync(s => s.FirstName == firstName && s.LastName == lastName);

            if (student == null)
                return NotFound("Student not found");

            var results = await _context.Results
                .Where(r => r.StudentId == student.Id)
                .Include(r => r.Subject)
                .ToListAsync();

            if (results.Count == 0)
                return NotFound("No results found for this student");

            double totalMarks = results.Sum(r => r.Marks);
            int maxMarks = results.Count * 100; 
            double percentage = (double)totalMarks / maxMarks * 100;

            return Ok(new
            {
                StudentName = $"{student.FirstName} {student.LastName}",
                RollId = student.RollNumber,
                Class = student.Class,
                Results = results.Select((r, i) => new
                {
                    Index = i + 1,
                    Subject = r.Subject.Name,
                    Marks = r.Marks
                }),
                TotalMarks = $"{totalMarks} out of {maxMarks}",
                Percentage = Math.Round(percentage, 2)
            });
        }

    
}
}
