using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
         IUserRepository UserRepository {get; }
        IExpenseRepository ExpenseRepository {get; }

        Task<bool> Complete();
        
    }
}