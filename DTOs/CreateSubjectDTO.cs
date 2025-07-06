using System.ComponentModel.DataAnnotations;

namespace StudentResultManagement.DTOs
{
    public class CreateSubjectDTO
    {
        public string Name { get; set; }
        public string Class { get; set; }
        [Required]
        public string Code { get; set; }
        public int TeacherId { get; set; }
    }
}