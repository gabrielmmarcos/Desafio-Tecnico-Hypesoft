using System.Security.Claims;

namespace Hypesoft.API.Services;

public class IdentityService(IHttpContextAccessor httpContextAccessor) : IIdentityService
{
    private readonly ClaimsPrincipal? _user = httpContextAccessor.HttpContext?.User;

    // O 'sub' é o ID padrão do usuário no Keycloak/JWT
    public string GetUserId() => 
        _user?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;
    
    // Nome de exibição ou username
    public string GetUserName() => 
        _user?.FindFirst("preferred_username")?.Value ?? _user?.Identity?.Name ?? "Sistema";

    public IEnumerable<string> GetUserRoles()
    {
        // Pega as roles que o Keycloak envia no token
        return _user?.FindAll(ClaimTypes.Role).Select(c => c.Value) ?? Enumerable.Empty<string>();
    }
}