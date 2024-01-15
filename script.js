
function mostrar_erro(tipo, item, msg_=""){
    elemento_pai = item.parentElement
    item.classList.add("erro")

    let msg = ""
    if (tipo === 1){
        msg = "Obrigatório"
    }else if(tipo === 2){
        msg = msg_
    }
    if (elemento_pai.id === "vencimento"){
        elemento_pai = elemento_pai.parentElement
    }
    let span_aviso = document.getElementById("span-"+String(elemento_pai.children[0].id))
    if(span_aviso === null){
        span_aviso = document.createElement("span")
        span_aviso.setAttribute("id", "span-"+String(elemento_pai.children[0].id))
    }
    span_aviso.innerHTML = msg
    span_aviso.classList.add("span-aviso")


    elemento_pai.appendChild(span_aviso)
    
}
function verificacao_vazio(item){
    if (item.value.length === 0){
        mostrar_erro(1, item)
    }else{
        item.classList.remove("erro")
        item.classList.add("ok")
        elemento_pai = item.parentElement
        //console.log(elemento_pai)

        let span_erro = document.getElementById("span-"+String(elemento_pai.children[0].id))
        if(span_erro !== null){
            elemento_pai.removeChild(span_erro)
        }
        if (elemento_pai.children[0].id == "l-telefone"){
            document.getElementById("div-hidden").style.display = "flex"
        }
    }
}
let itens_ja_clicados = []

function focus_clique(element){
    //console.log(itens_ja_clicados)
    for(let index = 0; index < itens_ja_clicados.length; index++){
        verificacao_vazio(itens_ja_clicados[index])
    }
    if (!itens_ja_clicados.includes(element)){
        itens_ja_clicados.push(element)
    }
    //console.log(itens_ja_clicados)
}

function verificacao_cep(element){
    element.setAttribute("maxlength", "9");
    if (element.value.length == 5){
        element.value += "-";
    }else{
        console.log(element.value.length)
    }

    if(element.value.length < 9){
        mostrar_erro(2, element, "Cep Inválido.")

    }else if (element.value.length == 9){
        buscar_endereco_por_cep(String(element.value).replace("-", ""))
        element.classList.remove("erro")
        element.classList.add("ok")
        elemento_pai = element.parentElement
        //console.log(elemento_pai)

        let span_erro = document.getElementById("span-"+String(elemento_pai.children[0].id))
        if(span_erro !== null){
            elemento_pai.removeChild(span_erro)
        }
    }
    
}


function selecionar_forma_pagamento(element){
    let span_arr = document.getElementsByClassName("chk")
    for (let index = 0; index < span_arr.length; index++){
        if(span_arr[index] === element.children[0]){
            element.children[0].style.display = "block"
            element.children[1].classList.add("flag-card-active")

        }else{
            span_arr[index].style.display = "none"
            elemento_pai = span_arr[index].parentElement
            elemento_pai.children[1].classList.remove("flag-card-active")

        }
    }
}

// FUNÇÕES DO CARTÃO
function mascara_cartao(element){
    let tamanho = element.value.length 
    if (tamanho === 4)element.value+=" ";
    if (tamanho === 9)element.value+=" ";
    if (tamanho === 14)element.value+=" ";
    if (tamanho === 19)element.value+=" ";
}
function digitar_dado_cartao(element){
    if (element.id == "ncartao"){
        mascara_cartao(element)
    }
    if(element.id == "vc-mes" || element.id == "vc-ano"){
        let vencimento = document.getElementById("vencimento")
        if (element.id == "vc-mes"){
            vencimento.innerHTML = vencimento.innerHTML.replace("mes", element.value)
        }else if(element.id == "vc-ano"){
            vencimento.innerHTML = vencimento.innerHTML.replace("ano", element.value)
        }
    }else{

        let cartao_info = document.getElementById("cc-"+ String(element.id))
        cartao_info.innerHTML = element.value
    }

}

function mostrar_trazeira_cartao(){
    let frente = document.getElementById("cartao")
    frente.style.transform = "rotateY(180deg)"
}
function ocultar_trazeira_cartao(){

    let frente = document.getElementById("cartao")
    frente.style.transform = "rotateY(360deg)"
}

async function buscar_endereco_por_cep(value){
    let request = await fetch("viacep.com.br/ws/"+value+"/json/")
    let response = await request.json()
    console.log(response)
}