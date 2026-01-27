using Microsoft.AspNetCore.Mvc;

namespace ZavaStorefront.Controllers;

/// <summary>
/// Health check endpoint for container orchestration and load balancers.
/// </summary>
[ApiController]
[Route("[controller]")]
public class HealthController : ControllerBase
{
    private readonly ILogger<HealthController> _logger;

    public HealthController(ILogger<HealthController> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Basic health check endpoint.
    /// Returns 200 OK if the application is running.
    /// </summary>
    [HttpGet]
    public IActionResult Get()
    {
        _logger.LogDebug("Health check requested");
        return Ok(new
        {
            status = "healthy",
            timestamp = DateTime.UtcNow
        });
    }
}
