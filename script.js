const calcularRescisao = () => {
    // Capturando os valores do formulário
    const nome = document.getElementById("nome").value;
    const salarioBase = parseFloat(document.getElementById("salario-base").value) || 0;
    const comissoes = parseFloat(document.getElementById("comissoes").value) || 0;
    const adicionalNoturno = parseFloat(document.getElementById("adicional-noturno").value) || 0;
    const horasExtras = parseFloat(document.getElementById("horas-extras").value) || 0;
    const adicionais = parseFloat(document.getElementById("adicionais").value) || 0;
    const motivo = document.getElementById("motivo").value;
    const diasTrabalhados = parseInt(document.getElementById("dias-trabalhados").value) || 0;
    
    // Férias vencidas e 1/3 de férias
    const feriasVencidas = parseFloat(document.getElementById("ferias-vencidas").value) || 0;
    const valorFérias = feriasVencidas; // Férias vencidas
    const valor1TerçoFérias = valorFérias * (1 / 3); // 1/3 de férias

    // Vale transporte e vale refeição
    const recebeValeTransporte = document.getElementById("vale-transporte").checked;
    const recebeValeRefeicao = document.getElementById("vale-refeicao").checked;
    
    // Descontos
    const valeTransporteDesconto = recebeValeTransporte ? salarioBase * 0.06 : 0; // 6% do salário
    const valeRefeicaoDesconto = recebeValeRefeicao ? 0 : 0; // Modifique conforme necessário
    
    // Calculando o total de benefícios
    const totalBeneficios = salarioBase + comissoes + adicionalNoturno + horasExtras + adicionais + valorFérias + valor1TerçoFérias;

    // Cálculo do saldo de salário
    const saldoSalario = (salarioBase / 30) * diasTrabalhados;

    // Lógica de cálculo da rescisão
    let rescisao = 0;
    if (motivo === "sem_justa_causa") {
        rescisao = totalBeneficios * 1.5; // Exemplo de cálculo
    } else if (motivo === "pedido_demissao") {
        rescisao = totalBeneficios * 0.5;
    } else if (motivo === "justa_causa") {
        rescisao = 0;
    } else if (motivo === "acordo_partes") {
        rescisao = totalBeneficios * 1.2;
    }

    // Descontos de INSS e FGTS
    const fgts = totalBeneficios * 0.08; // 8% de FGTS
    const inss = totalBeneficios * 0.08; // 8% de INSS
    const impostos = inss + fgts; // Somando INSS e FGTS como descontos

    // Valor Bruto
    const valorBruto = totalBeneficios + saldoSalario + valorFérias + valor1TerçoFérias;

    // Descontos totais
    const descontosTotais = impostos + valeTransporteDesconto + valeRefeicaoDesconto;

    // Valor final da rescisão
    const valorFinalRescisao = rescisao - descontosTotais;

    // Atualizando os valores na tela
    document.getElementById("resultado-texto").textContent = `Valor da Rescisão: R$ ${rescisao.toFixed(2)}\nSaldo de Salário: R$ ${saldoSalario.toFixed(2)}`;

    // Atualizando o somatório
    document.getElementById("valor-bruto-valor").textContent = valorBruto.toFixed(2);
    document.getElementById("valor-descontos").textContent = descontosTotais.toFixed(2);
    document.getElementById("valor-rescisao-final").textContent = valorFinalRescisao.toFixed(2);

    // Gerando o documento rescisório
    const documentoTexto = document.getElementById("documento-texto");
    documentoTexto.textContent = 
    `----------------------------- DOCUMENTO DE RESCISÃO -----------------------------
    
    Nome do Trabalhador: ${nome}
    CPF: ${document.getElementById("cpf").value}
    Data de Admissão: ${document.getElementById("admissao").value}
    Data de Demissão: ${document.getElementById("demissao").value}
    Motivo da Rescisão: ${motivo.charAt(0).toUpperCase() + motivo.slice(1).replace(/_/g, ' ')}
    
    -------------------------------------------------------------------------
    
    Parâmetros Financeiros:
    Salário Base: R$ ${salarioBase.toFixed(2)}
    Comissões/Gorjetas: R$ ${comissoes.toFixed(2)}
    Adicional Noturno: R$ ${adicionalNoturno.toFixed(2)}
    Horas Extras: R$ ${horasExtras.toFixed(2)}
    Outros Adicionais: R$ ${adicionais.toFixed(2)}
    Férias Vencidas: R$ ${valorFérias.toFixed(2)}
    1/3 de Férias: R$ ${valor1TerçoFérias.toFixed(2)}

    -------------------------------------------------------------------------

    Descontos:
    INSS (8%): R$ ${inss.toFixed(2)}
    FGTS (8%): R$ ${fgts.toFixed(2)}
    Vale Transporte (6%): R$ ${valeTransporteDesconto.toFixed(2)}
    Vale Refeição: R$ ${valeRefeicaoDesconto.toFixed(2)}

    -------------------------------------------------------------------------

    Resumo do Cálculo:
    Total de Benefícios: R$ ${totalBeneficios.toFixed(2)}
    Saldo de Salário: R$ ${saldoSalario.toFixed(2)}
    Valor Final da Rescisão: R$ ${rescisao.toFixed(2)}

    -------------------------------------------------------------------------

    Resumo Final:
    Valor Bruto: R$ ${valorBruto.toFixed(2)}
    Total de Descontos: R$ ${descontosTotais.toFixed(2)}
    Valor Final da Rescisão: R$ ${valorFinalRescisao.toFixed(2)}

    -------------------------------------------------------------------------

    Caso tenha dúvidas sobre o cálculo ou os valores informados, entre em contato conosco.

    -------------------------- FIM DO DOCUMENTO RESCISÓRIO --------------------------`;
};

// Associando o cálculo ao evento de clique no botão
document.getElementById("calcular").addEventListener("click", calcularRescisao);
