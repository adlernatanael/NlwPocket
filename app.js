const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: 'Tomar 3L de água por dia',
    checked: false,
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta:"})

    if(meta.length == 0) {
        console.log('A meta não pode ser vazia.')
        return
    }

    metas.push(
        { value: meta, checked: false }
    )
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length === 0) {
        console.log("error: Nenhuma meta selecionada")
        return
    }

    

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log('Meta(s) marcadas como concluída(s)')

}

const metasReaalizadas = async () => {
    const realizadas = metas.filter((meta)=>{
            return meta.checked
    })

    if (realizadas.length === 0) {
        console.log('faz algo ai vai, tu não fez nada')
        return
    }

    await select({
        message: 'Metas Reaalizadas = ' + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async() => {
    const abertas = metas.filter((meta) => {
        return ! meta.checked
    })

    if (abertas.length === 0) {
        console.log('Show, você realizou as metas!')
        return
    }

    await select({
        message: "Metas Abertas = " + abertas.length,
        choices: [...abertas],
    })
}

const deletarMetas = async() => {
    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })
    const deletarItens = await checkbox({
        message: "Escolha uma meta para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if (deletarItens.length === 0) {
        console.log("nenhum item irá ser deletado");
        return
    }

    deletarItens.forEach((item) => {
        metas = metas.filter(() =>{
             return meta.value !== item
        })
    })

    console.log('Deu certo!')

}

const start = async () => {
    while(true){
        
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizdas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar Metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break;
            case "listar":
                await listarMetas()
                break;
            case "realizadas":
                await metasReaalizadas()
                break;
                case "abertas":
                    await metasAbertas()
                    break;
                    case "deletar":
                        await deletarMetas()
                        break;
            case "sair":
                console.log('Até a próxima!')
                return;
        }
    }
}

start();