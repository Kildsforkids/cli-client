using Microsoft.EntityFrameworkCore;
using Server.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<CommandsContext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString(nameof(CommandsContext)));
});

var app = builder.Build();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
