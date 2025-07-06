using System.ComponentModel.DataAnnotations;

namespace StudentResultManagement.Models
{
    public class Result
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int StudentId { get; set; }

        [Required]
        public int SubjectId { get; set; }

        [Required]
        [Range(0, 100)]
        public double Marks { get; set; }

        [StringLength(2)]
        public string Grade { get; set; }  

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public Student Student { get; set; }
        public Subject Subject { get; set; }
    }
}
