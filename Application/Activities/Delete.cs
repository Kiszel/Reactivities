using MediatR;
using System;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;


namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest{
            public Guid Id { get; set; }
        }

        public class Handler: IRequestHandler<Command>{
            private readonly DataContext _context;
            public Handler(DataContext context ){
                _context=context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellation){
                var activity = await _context.Activities.FindAsync(request.Id);
                if(activity==null){
                    throw new Exception("Didnt find the activity");
                }
                _context.Remove(activity);

                var succes = await _context.SaveChangesAsync() > 0;
                if(succes) return Unit.Value;
                throw new Exception("Problem Saving changes");
            }
        }
    }
}