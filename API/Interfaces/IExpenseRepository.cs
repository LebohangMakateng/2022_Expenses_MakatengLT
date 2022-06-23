using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IExpenseRepository
    {
         void AddExpense(Expense expense);
         void UpdateExpense(Expense expense);
        void DeleteExpense(Expense expense);
        Task<Expense> GetExpense(int id);
        
        Task<IEnumerable<Expense>> GetExpensesAsync();

    }
}