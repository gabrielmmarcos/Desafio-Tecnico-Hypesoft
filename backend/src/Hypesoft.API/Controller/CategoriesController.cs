using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;

[Authorize]
[ApiController]
[Route("api/categories")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryRepository _repository;
    private readonly IProductRepository _productRepository;

    public CategoriesController(
        ICategoryRepository repository,
        IProductRepository productRepository)
    {
        _repository = repository;
        _productRepository = productRepository;
    }

    [HttpPost]
    public async Task<IActionResult> Create(string name)
    {
        var category = new Category(name);

        await _repository.CreateAsync(category);

        return Ok(category.Id);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await _repository.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductsByCategory(Guid id)
    {
        var products = await _productRepository.GetAllAsync();
        var filtered = products.Where(p => p.CategoryId == id);

        return Ok(filtered);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteAll()
    {
        await _repository.DeleteAllAsync();
        return Ok("Todas as categorias foram removidas.");
    }
}