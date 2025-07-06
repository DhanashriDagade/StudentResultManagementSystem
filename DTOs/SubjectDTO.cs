using System.ComponentModel.DataAnnotations;

namespace StudentResultManagement.DTOs
{
    public class SubjectDTO
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        public string Class { get; set; }

        [Required]
        public string Code { get; set; }

        [Required]
        public int TeacherId { get; set; }
    }
}
