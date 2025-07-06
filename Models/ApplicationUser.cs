using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace StudentResultManagement.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public string? FullName { get; set; }

        [Required]
        public string? Role { get; set; } // Admin, Teacher, Student
    }
}
