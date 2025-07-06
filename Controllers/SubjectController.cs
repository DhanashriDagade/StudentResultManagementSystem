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
    public class SubjectController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SubjectController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/subject
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var subjects = await _context.Subjects.Include(s => s.Teacher).ToListAsync();
            return Ok(subjects);
        }

        // GET: api/subject/{id}
        [HttpGet("{id}")]
       
        public async Task<IActionResult> GetById(int id)
        {
            var subject = await _context.Subjects.Include(s => s.Teacher).FirstOrDefaultAsync(s => s.Id == id);
            if (subject == null) return NotFound("Subject not found.");
            return Ok(subject);
        }

        // POST: api/subject
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] CreateSubjectDTO model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var subject = new Subject
            {
                Name = model.Name,
                Class = model.Class,
                Code = model.Code,
                TeacherId = model.TeacherId
            };

            _context.Subjects.Add(subject);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Subject created successfully." });
        }

        // PUT: api/subject/{id}
        [HttpPut("{id}")]
    
        public async Task<IActionResult> Update(int id, [FromBody] UpdateSubjectDTO model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var subject = await _context.Subjects.FindAsync(id);
            if (subject == null) return NotFound("Subject not found.");

            subject.Name = model.Name;
            subject.Class = model.Class;
            subject.Code = model.Code;
            subject.TeacherId = model.TeacherId;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Subject updated successfully." });
        }

        // DELETE: api/subject/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var subject = await _context.Subjects.FindAsync(id);
            if (subject == null) return NotFound("Subject not found.");

            _context.Subjects.Remove(subject);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Subject deleted successfully." });
        }
    }
}
