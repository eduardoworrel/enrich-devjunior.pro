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
    public class OpenedResultController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OpenedResultController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/OpenedResult
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OpenedResult>>> GetOpenedResult()
        {
            return await _context.OpenedResult.ToListAsync();
        }

        // GET: api/OpenedResult/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OpenedResult>> GetOpenedResult(int id)
        {
            var openedResult = await _context.OpenedResult.FindAsync(id);

            if (openedResult == null)
            {
                return NotFound();
            }

            return openedResult;
        }

        // PUT: api/OpenedResult/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOpenedResult(int id, OpenedResult openedResult)
        {
            if (id != openedResult.Id)
            {
                return BadRequest();
            }

            _context.Entry(openedResult).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OpenedResultExists(id))
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

        // POST: api/OpenedResult
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OpenedResult>> PostOpenedResult(OpenedResult openedResult)
        {
            _context.OpenedResult.Add(openedResult);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOpenedResult", new { id = openedResult.Id }, openedResult);
        }

        // DELETE: api/OpenedResult/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOpenedResult(int id)
        {
            var openedResult = await _context.OpenedResult.FindAsync(id);
            if (openedResult == null)
            {
                return NotFound();
            }

            _context.OpenedResult.Remove(openedResult);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OpenedResultExists(int id)
        {
            return _context.OpenedResult.Any(e => e.Id == id);
        }
    }
}
