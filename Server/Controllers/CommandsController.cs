using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using System.Diagnostics;

namespace Server.Controllers {

    [Route("api/cmd")]
    [ApiController]
    public class CommandsController : ControllerBase
    {
        private readonly CommandsContext _context;
        private readonly Process _cmd;

        public CommandsController(CommandsContext context) {
            _context = context;
            _cmd = new Process();
            _cmd.StartInfo = new ProcessStartInfo {
                FileName = "cmd.exe",
                CreateNoWindow = true,
                RedirectStandardOutput = true
            };
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Command>>> GetCommands() {
            return await _context.Commands.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Command>> PostCommand(Command command) {

            command.Time = DateTime.Now;

            string result = RunCommand(command.Value);
            _cmd.Close();

            Console.WriteLine($"RESULT: {result}");

            _context.Commands.Add(command);
            await _context.SaveChangesAsync();

            return Content(result);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCommands() {

            _context.Commands.RemoveRange(_context.Commands);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private string RunCommand(string command) {
            _cmd.StartInfo.Arguments = "/C " + command;
            _cmd.Start();
            string result = _cmd.StandardOutput.ReadToEnd();
            return result;
        }
    }
}
