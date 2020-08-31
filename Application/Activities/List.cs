using System.Collections.Generic;
using Domain;
using MediatR;
using Persistence;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;


namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>>{}

        public class Handler : IRequestHandler<Query,List<Activity>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context){
                _context = context;
            }
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken){
                
                
                var activities = await _context.Activities.ToListAsync(cancellationToken);

                return activities;
            }
        }

    }
}