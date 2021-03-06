using MediatR;
using System;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using Application.Errors;
using System.Net;


namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest{
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime? Date { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        }
        
    public class ComandValidatior : AbstractValidator<Command>{

        public ComandValidatior(){
            RuleFor(x=>x.Title).NotEmpty();
            RuleFor(x=>x.Description).NotEmpty();
            RuleFor(x=>x.Category).NotEmpty();
            RuleFor(x=>x.City).NotEmpty();
            RuleFor(x=>x.Venue).NotEmpty();
            RuleFor(x=>x.Date ).NotEmpty();

        }
    }

        public class Handler: IRequestHandler<Command>{
            private readonly DataContext _context;
            public Handler(DataContext context ){
                _context=context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellation){
                var acitivity = await _context.Activities.FindAsync(request.Id);

                if(acitivity==null){
                    throw new RestException(HttpStatusCode.NotFound, new {activity="not Found"});
                }
                acitivity.Title = request.Title ?? acitivity.Title;
                acitivity.Description = request.Description ?? acitivity.Description;
                acitivity.Category = request.Category ?? acitivity.Category;
                acitivity.Date = request.Date ?? acitivity.Date;
                acitivity.City = request.City ?? acitivity.City;
                acitivity.Venue = request.Venue ?? acitivity.Venue;

                

                var succes = await _context.SaveChangesAsync() > 0;
                if(succes) return Unit.Value;
                throw new Exception("Problem Saving changes");
            }
        }
    }
}