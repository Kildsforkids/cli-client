using Microsoft.EntityFrameworkCore;

namespace Server.Models {

    public class CommandsContext : DbContext {

        public DbSet<Command> Commands { get; set; }

        public CommandsContext(DbContextOptions<CommandsContext> options) : base(options) {
            Database.EnsureCreated();
        }
    }
}
