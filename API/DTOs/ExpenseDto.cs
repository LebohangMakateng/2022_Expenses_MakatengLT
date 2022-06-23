using System;

namespace API.DTOs
{
    public class ExpenseDto
    {
         public int Id { get; set; }
         public DateTime ExpenseDate { get; set; } = DateTime.UtcNow;
         public string Description { get; set; }
         public decimal Amount {get; set; }
         public string Username {get; set;}
    }
}