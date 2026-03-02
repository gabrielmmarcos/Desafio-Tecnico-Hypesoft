using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Hypesoft.Domain.Repositories;

[Authorize]
[ApiController]
[Route("api/dashboard")]
public class DashboardController : ControllerBase
{
    private readonly IProductRepository _productRepository;
    private readonly ICategoryRepository _categoryRepository;

    public DashboardController(
        IProductRepository productRepository,
        ICategoryRepository categoryRepository)
    {
        _productRepository = productRepository;
        _categoryRepository = categoryRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetDashboard()
    {
        var products = await _productRepository.GetAllAsync();
        var categories = await _categoryRepository.GetAllAsync();

        var totalProducts = products.Count;
        var totalCategories = categories.Count;
        var totalItemsInStock = products.Sum(p => p.StockQuantity);
        var totalStockValue = products.Sum(p => p.StockQuantity * p.Price);

        return Ok(new
        {
            totalProducts,
            totalCategories,
            totalItemsInStock,
            totalStockValue
        });
    }
}