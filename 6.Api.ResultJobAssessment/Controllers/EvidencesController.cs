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
    public class EvidencesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EvidencesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ClosedResult
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClosedEvidences>>> GetEvidences()
        {
            return await _context.ClosedEvidences.ToListAsync();
        }

        // GET: api/ClosedResult/5
        [HttpPost]
        public async Task<ActionResult<ClosedEvidences>> PostClosedJobEvidence(ClosedEvidences closedEvidences)
        {
            await _context.ClosedEvidences.AddAsync(closedEvidences);

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEvidences), closedEvidences);
        }
    }
}