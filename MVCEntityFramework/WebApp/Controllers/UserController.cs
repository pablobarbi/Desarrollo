using System.Web.Mvc;
using WebApp.Interface;
using WebApp.Models;
using WebApp.Repositories;

namespace WebApp.Controllers
{
    public class UserController : Controller
    {


        static readonly IRepository<Usuario> repository = new UserRepository();

       
        public ActionResult Index()
        {
            return View();
        }


        public JsonResult GetAllUser()
        {
            return Json(repository.GetAll(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Create(Usuario item)
        {
            item = repository.Add(item);
            return Json(item, JsonRequestBehavior.AllowGet);
        }
       
        public JsonResult Edit(Usuario item)
        {
           
            if (repository.Update(item))
            {
                return Json(repository.GetAll(), JsonRequestBehavior.AllowGet);
            }

            return Json(null);
        }

        public JsonResult Delete(int id)
        {

            if (repository.Delete(id))
            {
                return Json(new { Status = true }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { Status = false }, JsonRequestBehavior.AllowGet);

        }





    }
}