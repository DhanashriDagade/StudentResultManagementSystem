using System.ComponentModel.DataAnnotations;

namespace StudentResultManagement.DTOs
{
    public class RegisterStudentDTO
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Phone]
        public string Phone { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string RollNumber { get; set; }

        [Required]
        public string Class { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }
    }
}
