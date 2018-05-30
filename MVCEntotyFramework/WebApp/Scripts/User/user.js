function UserViewModel() {

    var self = this;

    self.Id = ko.observable("");
    self.Nombre = ko.observable("");
    self.Apellido = ko.observable("");


  

    var User = {
        Id: self.Id,
        Nombre: self.Nombre,
        Apellido: self.Apellido
    };


    self.User = ko.observable();
    self.Users = ko.observableArray();

    $.ajax({
        url: 'User/GetAllUser',
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        data: {},
        success: function (data) {
            self.Users(data);
        }
    });



    self.create = function () { }

    self.create = function () {

        if (User.Nombre != "" && User.Apellido != "") {

            $.ajax({
                url: 'User/Create',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(User),
                success: function (data) {
                    self.Users.push(data);
                    self.Nombre("");
                    self.Apellido("");
                }

            }).fail(
                function (xhr, textStatus, err) {
                    alert(err);
                });

        }
        else {
            alert("Debe ingresar información");
        }
    };


    self.delete = function (User) {

        if (confirm("Esta seguro que desea eliminar el usuario: " + User.Nombre + "," + User.Apellido)) {
            var id = User.Id;
            $.ajax({
                url: 'User/Delete/' + id,
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: id,
                success: function (data) {
                    self.Users.remove(User);
                }
            }).fail(
            function (xhr, textStatus, err) {
                self.status(err);
            });




        }


    };

    self.edit = function (user) {
        self.User(user);
    }

    self.update = function () {

      var User = self.User();

            $.ajax({
                url: 'User/Edit',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(User),
            success: function (data) {
                self.Users.removeAll();
                self.Users(data); //Put the response in ObservableArray
                self.User(null);
                alert("Se actualizo correctamente");
            }
        })
        .fail(
        function (xhr, textStatus, err) {
            alert(err);
        });




    }



    self.reset = function () {
        self.Nombre("");
        self.Apellido("");

    }


    self.cancel = function () {
        self.User(null);
    }



  




    //bind filter to filter text
    self.filter = ko.observable();

    //Use filteredList in html binding instead of controlFields
    self.filteredUsers = ko.computed(function () {
        var filter = self.filter(),
            arr = [];
        if (filter) {
            ko.utils.arrayForEach(self.Users(), function (item) {
                if (item.Nombre.toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
                    arr.push(item);
                }

            });
        } else {
            arr = self.Users();
        }
        return arr;

    });





}



var viewModel = new UserViewModel();
ko.applyBindings(viewModel);