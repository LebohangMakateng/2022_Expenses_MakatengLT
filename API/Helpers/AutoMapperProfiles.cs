using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Expense,ExpenseDto>();
            CreateMap<ExpenseUpdateDto, Expense>();
            CreateMap<RegisterDto, AppUser>();
        }
    }
}