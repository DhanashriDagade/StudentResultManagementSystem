using Microsoft.AspNetCore.Mvc;
using StudentResultManagement.Data;
using StudentResultManagement.DTOs;
using StudentResultManagement.Models;

namespace StudentResultManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ContactController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> SubmitContactMessage([FromBody] ContactMessageDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var message = new ContactMessage
            {
                Name = dto.Name,
                Email = dto.Email,
                Message = dto.Message
            };

            _context.ContactMessages.Add(message);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Message submitted successfully!" });
        }

       
        [HttpGet]
        public async Task<IActionResult> GetAllMessages()
        {
            var messages = _context.ContactMessages
                .OrderByDescending(m => m.CreatedAt)
                .ToList();

            return Ok(messages);
        }
    }
}
