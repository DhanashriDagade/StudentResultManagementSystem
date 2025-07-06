using System.ComponentModel.DataAnnotations;

namespace StudentResultManagement.DTOs
{
    public class UpdateSubjectDTO
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        public string Class { get; set; }

        public string Code { get; set; }

        [Required]
        public int TeacherId { get; set; }
    }
}
