﻿using System.ComponentModel.DataAnnotations;

namespace StudentResultManagement.DTOs
{
    public class LoginDTO
    {
        [Required, EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
    }
}

