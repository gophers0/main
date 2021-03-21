var users_table;
var view_user_table;

function load_users() {
    if ($.fn.dataTable.isDataTable('#example')) {
        users_table.destroy()
    }
    $.ajax({
        url: BaseStorageUrl + 'cms/users/list',
        method: 'post',
        data: JSON.stringify({"login": ""}),
        headers: {
            Authorization: getAuthToken()
        },
        success: function (data) {
            users_table = $('#example').DataTable({
                data: data.records,
                deferRender: true,
                scrollY: 200,
                scrollCollapse: true,
                scroller: true,
                aoColumns: [{
                    mData: "id",
                    sTitle: "ID"
                }, {
                    mData: "created_at",
                    sTitle: "Создан"
                }, {
                    mData: "login",
                    sTitle: "Login"
                }, {
                    mData: "role",
                    sTitle: "Роль"
                }, {
                    mData: "disk_space",
                    sTitle: "Файлов",
                    mRender: function (disk_space, type, full) {
                        return disk_space.files && disk_space.files.length || 0
                    }
                }, {
                    mData: "disk_space",
                    sTitle: "Свободно места",
                    mRender: function (disk_space, type, full) {
                        return (disk_space.free_space / 1024 / 1026).toFixed(2) + 'Mb'
                    }
                }, {
                    mData: "login",
                    sTitle: "Просмотр файлов",
                    mRender: function (login, type, full) {
                        return '<a data-login="' + login + '" onclick="view_files(this);return false;" href="#">Смотреть файлы</a>';
                    }
                }, {
                    mData: "id",
                    sTitle: "Действия",
                    mRender: function (id, type, full) {
                        return '<a data-id="' + id + '" onclick="delete_user(this);return false;">Удалить</a>';
                    }
                }]
            });

            console.log(data);
        }
    })
}

function view_files(o) {
    $.ajax({
        url: BaseStorageUrl + 'cms/user',
        method: 'post',
        data: JSON.stringify({"user_name": $(o).data('login')}),
        headers: {
            Authorization: getAuthToken(),
            'Content-type': 'application/json'
        },
        success: function (d) {
            // make modal
            $('#view_user').modal('show');
            view_user_table = $('#listFiles').dataTable({
                data: d.disk_space.files || [],
                deferRender: true,
                scrollY: 200,
                scrollCollapse: true,
                scroller: true,
                aoColumns: [{
                    mData: "id",
                    sTitle: "ID"
                }, {
                    mData: "created_at",
                    sTitle: "Создан"
                }, {
                    mData: "updated_at",
                    sTitle: "Обновлен"
                }, {
                    mData: "name",
                    sTitle: "Имя файла"
                }, {
                    mData: "mime",
                    sTitle: "Тип файла"
                }, {
                    mData: "size",
                    sTitle: "Размер",
                    mRender: function (size, type, full) {
                        return (size / 1024 / 1024).toFixed(2) + 'Mb';
                    }
                }, {
                    mData: "id",
                    sTitle: "Действия",
                    mRender: function (id, type, full) {
                        return '<a href="' + BaseStorageUrl + 'file/' + id + '"  onclick="delete_file(this);return false;" href="#">Удалить файл</a>';
                    }
                }]
            });
        },
        error: function (e) {
            showNotification('Query error', true)
        }

    })
}

function submit_create_user() {
    var $form = $('#create_userForm'),
        login = $form.find('input[name=login]'),
        pass = $form.find('input[name=password]'),
        role = $form.find('select')

    $.ajax({
        url: UserBaseUrl + 'user/',
        method: 'post',
        dataType: 'json',
        data: JSON.stringify({"login": login.val(), "password": pass.val(), "role": role.val()}),
        headers: {
            Authorization: getAuthToken(),
            'Content-type': 'application/json'
        },
        success: function (d) {
            login.val('')
            pass.val('')
            role.val('')
            $('#create_user').modal('hide');
            load_users();
            showNotification('Пользователь успешно создан', false);
        }, error: function () {
            showNotification('Не удалось создать пользователя', true);
        }
    })

}

function close_view_user() {
    $('#view_user .modal-body').html('');
    $('#view_user .modal-body').append('<table id="listFiles" class="display nowrap table table-striped" style="width:100%"></table>');
}

function delete_user(a) {
    $.ajax({
        url: BaseStorageUrl + 'cms/user/' + $(a).data('id'),
        method: 'delete',
        headers: {
            Authorization: getAuthToken()
        },
        success: function (d) {
            console.log(d)
            showNotification('Пользователь успешно удален', false);
        }, error: function (e) {
            showNotification('Ошибка запроса на удаление пользователя', true)
        }
    })
}