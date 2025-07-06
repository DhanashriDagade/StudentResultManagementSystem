using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentResultManagement.Data;

namespace StudentResultManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Student")]
    public class StudentViewResultController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StudentViewResultController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("my-results")]
        public async Task<IActionResult> GetMyResults()
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            var student = await _context.Students.FirstOrDefaultAsync(s => s.UserId == userId);
            if (student == null)
                return NotFound("Student record not found");

            var results = await _context.Results
                .Where(r => r.StudentId == student.Id)
                .Include(r => r.Subject)
                .Select(r => new
                {
                    r.Id,
                    Subject = r.Subject.Name,
                    r.Marks,
                    r.Grade,
                    r.CreatedAt
                })
                .ToListAsync();

            return Ok(results);
        }
        [HttpGet("profile")]
        public async Task<IActionResult> GetStudentProfile()
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            var student = await _context.Students.FirstOrDefaultAsync(s => s.UserId == userId);

            if (student == null)
                return NotFound("Student not found");

            return Ok(new
            {
                student.FirstName,
                student.LastName,
                student.RollNumber,
                student.Class
            });
        }

    }
}
