using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentResultManagement.DTOs;
using StudentResultManagement.Models;
using StudentResultManagement.Data;

namespace StudentResultManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class StudentController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationDbContext _context;

        public StudentController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
        }

        [HttpPost("register")]
      
        public async Task<IActionResult> RegisterStudent(RegisterStudentDTO model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var existingUser = await _userManager.FindByEmailAsync(model.Email);
            if (existingUser != null) return BadRequest("User already exists.");

            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FullName = $"{model.FirstName} {model.LastName}",
                Role = "Student",
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);

            if (!await _roleManager.RoleExistsAsync("Student"))
                await _roleManager.CreateAsync(new IdentityRole("Student"));

            await _userManager.AddToRoleAsync(user, "Student");

            var student = new Student
            {
                UserId = user.Id,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Phone = model.Phone,
                Gender = model.Gender,
                Address = model.Address,
                RollNumber = model.RollNumber,
                Class = model.Class,
                CreatedAt = DateTime.UtcNow
            };

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Student registered successfully" });
        }

        [HttpGet]
      
        public async Task<IActionResult> GetAllStudents()
        {
            var students = await _context.Students.ToListAsync();
            return Ok(students);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStudentById(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null) return NotFound();
            return Ok(student);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, RegisterStudentDTO model)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
                return NotFound("Student not found");

            // Update fields
            student.FirstName = model.FirstName;
            student.LastName = model.LastName;
            student.Email = model.Email;
            student.Phone = model.Phone;
            student.Gender = model.Gender;
            student.Address = model.Address;
            student.RollNumber = model.RollNumber;
            student.Class = model.Class;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { message = "Student updated successfully" });
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return StatusCode(409, new { error = "Concurrency conflict. Please refresh and try again." });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
                return NotFound("Student not found");

            try
            {
                _context.Students.Remove(student);
                var affected = await _context.SaveChangesAsync();

                if (affected == 0)
                    return Conflict("Delete failed: student may have already been removed.");
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict("Concurrency issue: student was modified or deleted by another process.");
            }

            return Ok(new { message = "Student deleted successfully" });
        }

        [HttpGet("by-name")]
        [Authorize(Roles = "Admin,Student,Teacher")] // Allow multiple roles
        public async Task<IActionResult> GetStudentByName([FromQuery] string firstName, [FromQuery] string lastName)
        {
            var student = await _context.Students
                .FirstOrDefaultAsync(s => s.FirstName == firstName && s.LastName == lastName);

            if (student == null)
                return NotFound("Student not found");

            return Ok(student);
        }


    }
}
