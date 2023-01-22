using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.ResultJobAssessment
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClosedResultController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ClosedResultController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ClosedResult
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClosedResult>>> GetClosedResult()
        {
            return await _context.ClosedResult.ToListAsync();
        }

        // GET: api/ClosedResult/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClosedResult>> GetClosedResult(int id)
        {
            var closedResult = await _context.ClosedResult.FindAsync(id);

            if (closedResult == null)
            {
                return NotFound();
            }

            return closedResult;
        }

        // PUT: api/ClosedResult/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClosedResult(int id, ClosedResult closedResult)
        {
            if (id != closedResult.Id)
            {
                return BadRequest();
            }

            _context.Entry(closedResult).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClosedResultExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ClosedResult
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ClosedResult>> PostClosedResult(ClosedResult closedResult)
        {
            _context.ClosedResult.Add(closedResult);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClosedResult", new { id = closedResult.Id }, closedResult);
        }

        // DELETE: api/ClosedResult/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClosedResult(int id)
        {
            var closedResult = await _context.ClosedResult.FindAsync(id);
            if (closedResult == null)
            {
                return NotFound();
            }

            _context.ClosedResult.Remove(closedResult);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClosedResultExists(int id)
        {
            return _context.ClosedResult.Any(e => e.Id == id);
        }
    }
}
