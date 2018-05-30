using System;
using System.Collections.Generic;
using System.Linq;
using WebApp.Interface;
using WebApp.Models;

namespace WebApp.Repositories
{
    public class UserRepository : IRepository<Usuario>
    {
        ExamenEntities examenEntity = new ExamenEntities();

        Usuario IRepository<Usuario>.Add(Usuario item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }
            examenEntity.Usuarios.Add(item);
            examenEntity.SaveChanges();
            return item;
        }

        bool IRepository<Usuario>.Delete(int id)
        {
            Usuario user = examenEntity.Usuarios.Find(id);
            examenEntity.Usuarios.Remove(user);
            examenEntity.SaveChanges();

            return true;
        }

        Usuario IRepository<Usuario>.Get(int id)
        {
            return examenEntity.Usuarios.Find(id);
        }

        IEnumerable<Usuario> IRepository<Usuario>.GetAll()
        {
            return examenEntity.Usuarios;
        }

        bool IRepository<Usuario>.Update(Usuario item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }
            var user = examenEntity.Usuarios.Single(a => a.Id == item.Id);
            user.Nombre = item.Nombre;
            user.Apellido = item.Apellido;

            examenEntity.SaveChanges();

            return true;
        }
    }
}