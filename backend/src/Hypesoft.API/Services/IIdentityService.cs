namespace Hypesoft.API.Services;

public interface IIdentityService
{
    string GetUserId();
    string GetUserName();
    IEnumerable<string> GetUserRoles();
}