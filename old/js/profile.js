var BaseStorageUrl = '//localhost:8000/';

function getProfile() {
    $.ajax({
        url: BaseStorageUrl + "profile/",
        method: "get",
        headers: {
            Authorization: getAuthToken()
        },
        success: function (d) {
            console.log('profile', d)
            renderMyFiles(d.files);
            renderDiskSpace(d.disk_space, d.files);
            renderSharedFiles(d.shared_files);
            renderTrash(d.trash_files);
        },
        error: function (e) {
            console.log('profile error', e)
        }
    })
}

function getAuthToken() {
    var user = localStorage.getItem("user")
    var token = localStorage.getItem("token")

    if (user != null && token != null) {
        user = JSON.parse(user)
        return user.id + ':' + token;
    }
    return "";
}

function getPreviewIcon(type) {
    switch (type) {
        case 'application/xhtml+xml':
        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return '<i class="ri-file-excel-2-line"></i>';
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        case 'application/msword':
            return '<i class="ri-file-word-2-line"></i>';
        case 'application/pdf':
            return '<i class="ri-file-pdf-line"></i>';
        case 'image/gif':
        case 'image/jpeg':
        case 'image/pjpeg':
        case 'image/png':
        case 'image/svg+xml':
        case 'image/webp':
            return '<i class="ri-image-2-line"></i>';
        default:
            return '<i class="ri-file-2-line"></i>';
    }
}

function renderMyFiles(files) {
    $('#myFiles').html('');
    if (files.length === 0) {
        $('#myFiles').html('Вы еще не загрузили ни одного файла, скорее <a href="#hero">загружайте</a>')
    }
    files.forEach(function (e) {
        var fileContainer = $('<div class="card" style="width: 18rem;"></div>');
        fileContainer.append('<div class="previewIcon">' + getPreviewIcon(e.mime) + '</div>')
        var body = $('<div class="card-body"></div>');
        body.append('<h5 class="card-title">' + e.name + '</h5>')
        body.append('<p class="card-text">Загружен: ' + (new Date(e.created_at)).toLocaleString("ru-RU") + '</p>')
        body.append('<a onclick="download_file(this); return false;" data-name="' + e.name + '" data-mime="' + e.mime + '" href="' + BaseStorageUrl + 'file/' + e.id + '" class="btn btn-primary"><i class="ri-download-cloud-line"></i>\n (' + (e.size / 1024 / 1024).toFixed(2) + ' Mb)</a>')
        body.append('<a onclick="delete_file(this); return false;" data-name="' + e.name + '" data-mime="' + e.mime + '" href="' + BaseStorageUrl + 'file/' + e.id + '" class="btn btn-default"><i class="ri-delete-bin-line"></i></a>')
        body.append('<a onclick="share_file_dialog(this); return false;" data-name="' + e.name + '" data-id="' + e.id + '" data-mime="' + e.mime + '" href="' + BaseStorageUrl + 'file/' + e.id + '" class="btn btn-default"><i class="ri-share-forward-fill"></i></a>')
        fileContainer.append(body)
        var wrapper = $('<div class="col-sm-6 col-lg-3"></div>')
        $('#myFiles').append(wrapper.append(fileContainer))
    })
}

function renderDiskSpace(space, files) {
    $('#disk_size').html((space.overall_space / 1024 / 1024).toFixed(2) + ' Mb');
    $('#disk_filled').html((space.occupied_space / 1024 / 1024).toFixed(2) + ' Mb');
    $('#disk_free').html((space.free_space / 1024 / 1024).toFixed(2) + ' Mb');
    $('#disk_files_count').html(files.length + ' шт');
}

function renderSharedFiles(files) {
    var $container = $('#shared_files');
    $container.html('')
    if (files.length === 0) {
        $container.html('С вами никто еще не делился файлами');
    }

    files.forEach(function (e) {
        var fileContainer = $('<div class="card" style="width: 18rem;"></div>');
        fileContainer.append('<img src="' + e.preview + '" class="card-img-top" alt="preview"/>')
        var body = $('<div class="card-body"></div>');
        body.append('<h5 class="card-title">' + e.name + '</h5>')
        body.append('<p class="card-text">Загружен: ' + (new Date(e.created_at).toLocaleString("ru-RU") + '</p>'));
        body.append('<a onclick="download_file(this); return false;" data-name="' + e.name + '" data-mime="' + e.mime + '" href="' + BaseStorageUrl + 'file/' + e.id + '" class="btn btn-primary"><i class="ri-download-cloud-line"></i>\nСкачать (' + (e.size / 1024 / 1024).toFixed(2) + ' Mb)</a>')
        fileContainer.append(body);
        var wrapper = $('<div class="col-sm-6 col-lg-3"></div>')
        $container.append(wrapper.append(fileContainer))
    })
}

function renderTrash(files) {
    $('#trash-items').html('');
    if (files.length === 0) {
        $('#trash-items').html('Ваша корзина пуста')
    }

    files.forEach(function (e) {
        var fileContainer = $('<div class="card" style="width: 18rem;"></div>');
        fileContainer.append('<img src="' + e.preview + '" class="card-img-top" alt="preview"/>')
        var body = $('<div class="card-body"></div>');
        body.append('<h5 class="card-title">' + e.name + '</h5>')
        body.append('<p class="card-text">Удален: ' + (new Date(e.deleted_at).toLocaleString("ru-RU") + '</p>'));
        fileContainer.append(body);
        var wrapper = $('<div class="col-sm-6 col-lg-3"></div>')
        $('#trash-items').append(wrapper.append(fileContainer))
    })
}

function download_file(a) {
    $.ajax({
        method: 'get',
        url: a.href,
        headers: {
            Authorization: getAuthToken()
        },
        success: function (d) {
            var blob = new Blob([d], {type: $(a).data('mime')});
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = $(a).data('name');

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    })
}

function upload_file(file) {
    var fd = new FormData();
    var files = $('#file')[0].files;

    if (file) {
        files = file
    }

    // Check file selected or not
    if (files.length > 0) {
        fd.append('file', files[0]);
        fd.append('name', files[0].name)
        fd.append('mime', files[0].type)
        fd.append('size', files[0].size)

        $.ajax({
            url: BaseStorageUrl + 'upload/file',
            type: 'post',
            data: fd,
            headers: {
                'Authorization': getAuthToken(),
            },
            contentType: false,
            processData: false,
            success: function () {
                getProfile();
                showNotification('Файл успешно загружен', false);

            },
            error: function (d) {
                console.log('error', d)
                showNotification('Ошибка загрузки файла', true);
            }
        });
    }
}

function delete_file(file) {
    var $a = $(file);

    $.ajax({
        url: file.href,
        method: 'DELETE',
        headers: {
            Authorization: getAuthToken()
        },
        success: function () {
            showNotification("Файл успешно удален", false)
            getProfile();
        },
        error: function (e) {
            showNotification('Ошибка удаления файла', true);
        }
    })
}

var timeout;

function showNotification(msg, isAlert) {
    var className = 'alert-success';
    if (isAlert) {
        className = 'alert-danger';
    }
    clearTimeout(timeout);
    $('#g-notification').remove();
    var container = $('<div id="g-notification"></div>');
    container.append('<div class="alert ' + className + '">' + msg + '</div>');
    $('body').append(container);

    timeout = setTimeout(function () {
        $('#g-notification').remove();
    }, 5000);
}

function share_file_dialog(a) {
    $('#shareFileModal').remove();
    var $content = $('<div class="modal fade" id="shareFileModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="staticBackdropLabel">Поделиться файлом</h5>' +
        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<form method="post" id="share_form">' +
        '<input type="hidden" name="file_id" value="' + $(a).data('id') + '"/>' +
        '<input type="text" name="login" placeholder="login">' +
        '</form>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>' +
        '<button type="button" onclick="share_file_req();return false;" class="btn btn-primary">Поделиться</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>');
    $('body').append($content);
    $('#shareFileModal').modal('show');
}

function share_file_req() {
    var form = $('#share_form');
    $.ajax({
        type: 'post',
        url: BaseStorageUrl + 'share/file',
        headers: {
            'Authorization': getAuthToken(),
            'Content-type': 'application/json'
        },
        data: JSON.stringify({
            "user_name": form.find('input[name=login]').val(),
            "file_id": parseInt(form.find('input[name=file_id]').val())
        }),
        success: function () {
            showNotification('Файл успешно расшарен', false)
            $('#shareFileModal').modal('hide');
            $('#shareFileModal').remove();
        },
        error: function () {
            showNotification('Ошибка расшаривания файла', true)
        }
    })
}