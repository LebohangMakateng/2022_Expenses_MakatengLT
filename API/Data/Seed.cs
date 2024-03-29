using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if (await context.Expenses.AnyAsync()) return;

            var expenseData = await System.IO.File.ReadAllTextAsync("Data/ExpenseSeedData.json");
            var expenses = JsonSerializer.Deserialize<List<Expense>>(expenseData);
            if (expenses == null) return;
            foreach (var expense in expenses)
            {
                await context.Expenses.AddAsync(expense);
            }
            
            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(expenseData);
            if (users == null) return;
            foreach (var user in users)
            {
                using var hmac = new HMACSHA512();

                user.UserName = user.UserName.ToLower();
                user.PasswordSalt = hmac.Key;
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));

                await context.Users.AddAsync(user);
            }
            await context.SaveChangesAsync();
        }
    }
}