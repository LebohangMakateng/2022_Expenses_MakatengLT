using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class ExpensesController: BaseApiController
    { 
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ExpensesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

         [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteExpense(int id)
        { 
            var Expense = await _unitOfWork.ExpenseRepository.GetExpense(id);

            _unitOfWork.ExpenseRepository.DeleteExpense(Expense);

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Problem deleting the Expense");
        }
        

        // api/users
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateExpense(int id)
        {
            var expense = await _unitOfWork.ExpenseRepository.GetExpense(id);

            _unitOfWork.ExpenseRepository.UpdateExpense(expense);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update Expense");
        }

        [HttpPost]
        public async Task<ActionResult<ExpenseDto>> AddExpense(Expense expense)
        {

           var newexpense = new Expense{
            Description = expense.Description,
            Username = expense.Username,
            ExpenseDate = expense.ExpenseDate,
            Amount = expense.Amount
           };

           _unitOfWork.ExpenseRepository.AddExpense(newexpense);

            if (await _unitOfWork.Complete()) return Ok(_mapper.Map<ExpenseDto>(expense));
        
            return BadRequest("Failed to Create Expense");
        }    
        
        // api/expenses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExpenseDto>>> GetExepenses()
        {
            var expenses = await _unitOfWork.ExpenseRepository.GetExpensesAsync();

            return Ok(expenses);
        }

        // api/expenses/pastmonth
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExpenseDto>>> GetAllExpenses()
        {
            List<Expense> newexpenses = new List<Expense>();  
            var expenses = await _unitOfWork.ExpenseRepository.GetExpensesAsync();
            foreach(Expense expense in expenses)
            {
                //https://stackoverflow.com/questions/528368/datetime-compare-how-to-check-if-a-date-is-less-than-30-days-old
                if (( expense.ExpenseDate - DateTime.Now).TotalDays < 30)
                 newexpenses.Add(expense);
            }
            return Ok(newexpenses);
        }

        // api/expenses/3
        [HttpGet(("{id}"))]
        public async Task<ActionResult<Expense>> GetExpense(int id)
        {
            return await _unitOfWork.ExpenseRepository.GetExpense(id);
        }

    }
}