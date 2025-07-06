// DTOs/ContactMessageDTO.cs
using System.ComponentModel.DataAnnotations;

namespace StudentResultManagement.DTOs
{
    public class ContactMessageDTO
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string Message { get; set; } = string.Empty;
    }
}
