using System;
using System.ComponentModel.DataAnnotations;

namespace StudentResultManagement.DTOs
{
    public class ResultDTO
    {
        public int Id { get; set; }

        [Required]
        public int StudentId { get; set; }

        public string? StudentName { get; set; } 

        [Required]
        public int SubjectId { get; set; }

        public string? SubjectCode { get; set; } 

        [Required]
        [Range(0, 100)]
        public int Marks { get; set; }

        [Required]
        [StringLength(2)]
        public string Grade { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
