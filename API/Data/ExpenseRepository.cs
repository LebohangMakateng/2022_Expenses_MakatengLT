using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ExpenseRepository: IExpenseRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ExpenseRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void AddExpense(Expense expense)
        {
            _context.Expenses.Add(expense);
            _context.SaveChanges();
        }

        public void UpdateExpense(Expense expense)
        {
            _context.Entry(expense).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void DeleteExpense(Expense expense)
        {
            _context.Expenses.Remove(expense);
            _context.SaveChanges();
        }

        public async Task<Expense> GetExpense(int id)
        {
            return await _context.Expenses.FindAsync(id);
        }

        public async Task<IEnumerable<Expense>> GetExpensesAsync()
        {
           return await _context.Expenses.ToListAsync();

        }
    }
}