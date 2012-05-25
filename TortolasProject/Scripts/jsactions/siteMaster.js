$(document).ready(function () {
    // Cultura
    kendo.culture("es-ES");

    $("#registroButton").click(function () {
        var u = $("#nicknameRegister").val();
        var p = $("#PasswordRegister").val();
        var cp = $("#PasswordConfirmationRegister").val();
        var e = $("#emailRegister").val();

        var url = "/Home/Registro";

        datos = {
            UserName: u,
            Password: p,
            Email: e,
            ConfirmPassword: cp
        };
        $.post(url, datos, function (data) {
            if (data == "ok") {
                location.reload();
            } else {
                alert(data);
            }
        });
    });

    $("#LogInButton").click(function () {
        alert("iniciando sesión");
        var u = $("#userLogIn").val();
        var p = $("#pwdLogIn").val();

        var url = "/Home/LogOn";

        datos = {
            username: u,
            pass: p,
            returnUrl: "/Home"
        };

        $.post(url, datos, function (data) {
            if (data == "ok") {
                location.reload();
            } else {
                alert(data);
            }
        });
    });

    $("#kedomenuizquierda").kendoMenu({
        direction: "right right",
        orientation: "vertical",
        dataSource: [
                        {
                            text: "Empresas", imageUrl: "../../content/icons/agents.ico",
                            
                            items: [
                                { 
                                    text: "Empresas y asociados", imageUrl: "../../content/icons/aim.ico",
                                    url: "http://localhost:3608/Empresas#",
                                 },
                                { text: "Contratos", imageUrl: "../../content/icons/aim.ico" }
                            ]
                        },
                        {
                            text: "Contabilidad", imageUrl: "../../content/icons/agents.ico",
                            
                            items: [
                                { 
                                    text: "Facturas", imageUrl: "../../content/icons/aim.ico",
                                    url: "/Facturas",
                                },
                                { 
                                    text: "Movimientos", imageUrl: "../../content/icons/aim.ico",
                                    url: "/Facturas/Movimientos",
                                },
                                { 
                                    text: "Gráficos contables", imageUrl: "../../content/icons/aim.ico",
                                    url: "/Facturas/graficosContables",
                                },
                            ]
                        }
                    ]
                });
     //Menu izquierda


});
