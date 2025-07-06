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
    [Authorize(Roles = "Admin,Teacher")]
    public class TeacherController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationDbContext _context;

        public TeacherController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
        }

        //  Register a Teacher 
        [HttpPost("register")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> RegisterTeacher(RegisterTeacherDTO model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var existingUser = await _userManager.FindByEmailAsync(model.Email);
            if (existingUser != null) return BadRequest("User already exists.");

            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FullName = $"{model.FirstName} {model.LastName}",
                Role = "Teacher",
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);

            if (!await _roleManager.RoleExistsAsync("Teacher"))
                await _roleManager.CreateAsync(new IdentityRole("Teacher"));

            await _userManager.AddToRoleAsync(user, "Teacher");

            var teacher = new Teacher
            {
                UserId = user.Id,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Phone = model.Phone,
                Gender = model.Gender,
                Address = model.Address,
            
                CreatedAt = DateTime.UtcNow
            };

            _context.Teachers.Add(teacher);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Teacher registered successfully" });
        }

        //  Get All Teachers
        [HttpGet]
        public async Task<IActionResult> GetAllTeachers()
        {
            var teachers = await _context.Teachers.ToListAsync();
            return Ok(teachers);
        }

        //  Get Teacher By ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTeacherById(int id)
        {
            var teacher = await _context.Teachers.FindAsync(id);
            if (teacher == null) return NotFound();
            return Ok(teacher);
        }
        //  Update Teacher 
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateTeacher(int id, [FromBody] UpdateTeacherDTO model)
        {
            var teacher = await _context.Teachers.FindAsync(id);
            if (teacher == null) return NotFound("Teacher not found");

            teacher.FirstName = model.FirstName;
            teacher.LastName = model.LastName;
            teacher.Email = model.Email;
            teacher.Phone = model.Phone;
            teacher.Gender = model.Gender;
            teacher.Address = model.Address;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Teacher updated successfully" });
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteTeacher(int id)
        {
            var teacher = await _context.Teachers.FindAsync(id);
            if (teacher == null)
                return NotFound("Teacher not found");

            try
            {
                // First remove the teacher
                _context.Teachers.Remove(teacher);
                var affectedRows = await _context.SaveChangesAsync();

                if (affectedRows == 0)
                    return Conflict("Delete failed: Teacher may have already been removed or modified.");

                // Then delete associated Identity User 
                var user = await _userManager.FindByIdAsync(teacher.UserId);
                if (user != null)
                {
                    var identityResult = await _userManager.DeleteAsync(user);
                    if (!identityResult.Succeeded)
                        return BadRequest("Teacher deleted, but failed to delete the associated Identity User.");
                }

                return Ok(new { message = "Teacher and associated user deleted successfully" });
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict("Concurrency issue: Teacher was already modified or deleted.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }



        //  Assign Result
        [HttpPost("assign-result")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> AssignResult([FromBody] AssignResultDTO dto)
        {
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
            return Ok(new { message = "Result assigned successfully" });
        }

        //  Update Result
        [HttpPut("result/{id}")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> UpdateResult(int id, [FromBody] AssignResultDTO dto)
        {
            var result = await _context.Results.FindAsync(id);
            if (result == null) return NotFound("Result not found");

            result.Marks = dto.Marks;
            result.Grade = dto.Grade;
            result.SubjectId = dto.SubjectId;
            result.StudentId = dto.StudentId;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Result updated successfully" });
        }

        //  View All Results
        [HttpGet("results")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> GetAllResults()
        {
            var results = await _context.Results
                .Include(r => r.Student)
                .Include(r => r.Subject)
                .ToListAsync();
            return Ok(results);
        }

        // View Result by ID
        [HttpGet("result/{id}")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> GetResultById(int id)
        {
            var result = await _context.Results
                .Include(r => r.Student)
                .Include(r => r.Subject)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (result == null) return NotFound("Result not found");
            return Ok(result);
        }

        // GET: api/teacher/students
        [HttpGet("students")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> GetStudentsForDropdown()
        {
            var students = await _context.Students
                .Select(s => new {
                    s.Id,
                    s.FirstName,
                    s.LastName,
                    s.RollNumber
                })
                .ToListAsync();

            return Ok(students);
        }



    }
}
