import type { Locale } from '../lib/content';

type StorySection = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  mediaId: string;
  evidence: 'documented' | 'context' | 'reconstruction';
};

type PersonStory = {
  note: string;
  sections: StorySection[];
};

const stories: Record<string, Record<Locale, PersonStory>> = {
  'giuseppe-giacomo-panzonato': {
    en: {
      note: 'This biography moves between family records and historical setting. Each section identifies whether it is documented evidence, period context, or a reconstruction still being tested.',
      sections: [
        {
          eyebrow: '22 July 1856 · documented',
          title: 'A name begins in Gambarare.',
          paragraphs: [
            'A parish-issued extract records Giuseppe Giacomo Panzonato as the son of Domenico Panzonato and Angela Salviato, called Campanella, born in Gambarare on 22 July 1856. It is the strongest anchor for his age and parentage.',
            'He was born under Austrian rule in Lombardy–Venetia. The political border changed when Veneto joined the Kingdom of Italy in 1866; the record does not tell us what Giuseppe thought of that change, only that his childhood crossed it.',
          ],
          mediaId: 'giuseppe-birth-1856', evidence: 'documented',
        },
        {
          eyebrow: '20 November 1881 · documented',
          title: 'Giuseppe and Fosca form a household.',
          paragraphs: [
            'The civil marriage extract from Mira names the twenty-five-year-old Giuseppe and twenty-one-year-old Fosca Moro, daughter of Andrea Moro and Pasqua Toffano. By 1891, six children travelled with them.',
            'Later accounts place this household amid the agrarian hardship of the Veneto. That setting helps explain the scale of migration, but no surviving family document states Giuseppe’s private reason for leaving.',
          ],
          mediaId: 'giuseppe-fosca-marriage-1881', evidence: 'documented',
        },
        {
          eyebrow: 'Late 1891 · reconstructed route',
          title: 'From a probable port to a named ship.',
          paragraphs: [
            'The São Paulo entry associates the family with the steamship Colombo and gives Rio de Janeiro as their provenance. Genoa fits the ship’s regular line and the family’s northern Italian origin, but the entry does not name their European embarkation port.',
            'The dates proposed for Genoa, Lisbon, and Cape Verde should therefore be read as a working itinerary. The images show the ports and maritime world of the period, not the Panzonatos themselves.',
          ],
          mediaId: 'genoa-port-noack-1892', evidence: 'reconstruction',
        },
        {
          eyebrow: '23 November 1891 · documented context',
          title: 'A naval crisis meets an uncertain itinerary.',
          paragraphs: [
            'Three days after the Colombo’s proposed arrival in Rio, Custódio José de Melo led a naval ultimatum against Deodoro da Fonseca. The battleship Riachuelo became the central image of a crisis that ended with Deodoro’s resignation and Floriano Peixoto’s accession.',
            'The national events are documented. The family’s presence in Guanabara that morning, and the claim that blockade, customs disruption, strikes, and quarantine held their ship for two weeks, remain a reconstruction awaiting a direct vessel record.',
          ],
          mediaId: 'riachuelo-ferrez-1891', evidence: 'context',
        },
        {
          eyebrow: '15 December 1891–5 December 1937 · documented',
          title: 'Giuseppe becomes José.',
          paragraphs: [
            'The Brás hostel register restores firm ground: Giuseppe, aged thirty-five, appears with Fosca and six children, from Rio de Janeiro and bound for Tietê. By 1899, the birth of a son places the household in Capivari.',
            'His Capivari death record names him José Pansonatto, an agricultural worker and widower of Fosca Morro. Its age and parent names conflict with the contemporary Italian extract. Those differences are preserved here as evidence of how names and memories changed after migration.',
          ],
          mediaId: 'giuseppe-death-1937', evidence: 'documented',
        },
      ],
    },
    'pt-br': {
      note: 'Esta biografia alterna documentos familiares e contexto histórico. Cada seção identifica se trata de evidência documentada, contexto de época ou reconstrução ainda em teste.',
      sections: [
        {
          eyebrow: '22 de julho de 1856 · documentado',
          title: 'Um nome começa em Gambarare.',
          paragraphs: [
            'Um extrato emitido pela paróquia registra Giuseppe Giacomo Panzonato como filho de Domenico Panzonato e Angela Salviato, chamada Campanella, nascido em Gambarare em 22 de julho de 1856. É a âncora mais segura para sua idade e filiação.',
            'Ele nasceu sob o domínio austríaco no Reino Lombardo-Vêneto. A fronteira política mudou quando o Vêneto foi incorporado ao Reino da Itália, em 1866; o documento não revela o que Giuseppe pensou dessa mudança, apenas que sua infância a atravessou.',
          ],
          mediaId: 'giuseppe-birth-1856', evidence: 'documented',
        },
        {
          eyebrow: '20 de novembro de 1881 · documentado',
          title: 'Giuseppe e Fosca formam uma casa.',
          paragraphs: [
            'O extrato civil de casamento de Mira identifica Giuseppe, de 25 anos, e Fosca Moro, de 21, filha de Andrea Moro e Pasqua Toffano. Dez anos depois, seis filhos viajariam com eles.',
            'Estudos posteriores situam esse lar em meio à crise agrária do Vêneto. Esse contexto ajuda a explicar a escala da emigração, mas nenhum documento familiar preservado declara a razão íntima de Giuseppe para partir.',
          ],
          mediaId: 'giuseppe-fosca-marriage-1881', evidence: 'documented',
        },
        {
          eyebrow: 'Fim de 1891 · rota reconstruída',
          title: 'De um porto provável a um navio nomeado.',
          paragraphs: [
            'O registro de São Paulo associa a família ao vapor Colombo e informa procedência do Rio de Janeiro. Gênova é compatível com a linha regular do navio e com a origem norte-italiana da família, mas o assento não identifica o porto europeu de embarque.',
            'As datas propostas para Gênova, Lisboa e Cabo Verde devem, portanto, ser lidas como um itinerário de trabalho. As imagens mostram os portos e o mundo marítimo da época, não os Panzonato.',
          ],
          mediaId: 'genoa-port-noack-1892', evidence: 'reconstruction',
        },
        {
          eyebrow: '23 de novembro de 1891 · contexto documentado',
          title: 'Uma crise naval encontra um itinerário incerto.',
          paragraphs: [
            'Três dias após a chegada proposta do Colombo ao Rio, Custódio José de Melo liderou um ultimato naval contra Deodoro da Fonseca. O encouraçado Riachuelo tornou-se a imagem central de uma crise que terminou com a renúncia de Deodoro e a posse de Floriano Peixoto.',
            'Os acontecimentos nacionais são documentados. A presença da família na Guanabara naquela manhã — e a afirmação de que bloqueio, desorganização alfandegária, greves e quarentena retiveram o navio por duas semanas — permanece uma reconstrução à espera de um registro direto da embarcação.',
          ],
          mediaId: 'riachuelo-ferrez-1891', evidence: 'context',
        },
        {
          eyebrow: '15 de dezembro de 1891–5 de dezembro de 1937 · documentado',
          title: 'Giuseppe se torna José.',
          paragraphs: [
            'O livro da Hospedaria do Brás devolve terreno firme: Giuseppe, de 35 anos, aparece com Fosca e seis filhos, procedente do Rio de Janeiro e destinado a Tietê. Em 1899, o nascimento de um filho situa a família em Capivari.',
            'Seu óbito em Capivari o chama José Pansonatto, lavrador e viúvo de Fosca Morro. A idade e os nomes dos pais divergem do extrato italiano contemporâneo. Essas diferenças são preservadas como evidência de como nomes e memórias mudaram depois da migração.',
          ],
          mediaId: 'giuseppe-death-1937', evidence: 'documented',
        },
      ],
    },
  },
  'fosca-moro': {
    en: {
      note: 'Fosca left no known diary. Her story is built from records that name her and from carefully marked inferences about caring for six children during migration.',
      sections: [
        {
          eyebrow: '20 November 1881 · documented',
          title: 'The first secure record of Fosca.',
          paragraphs: [
            'The Mira marriage record names Fosca Moro, aged twenty-one, daughter of Andrea Moro and the late Pasqua Toffano, marrying Giuseppe Panzonato. No verified birth record for Fosca is present in the working archive, so the precise date sometimes assigned to her birth remains less secure.',
            'This is an important limit. It keeps the biography attached to the documents that survive rather than silently making one family-tree date authoritative.',
          ],
          mediaId: 'giuseppe-fosca-marriage-1881', evidence: 'documented',
        },
        {
          eyebrow: '1881–1891 · family record',
          title: 'Six children, six different ages.',
          paragraphs: [
            'In the 1891 entry, Fosca is thirty and travels with Luigia, ten; Catarina, nine; Candida, seven; Luigi, five; Domenico, three; and Eugenio, one. Their survival to the São Paulo register is documented. The daily labour that made it possible is not.',
            'It is reasonable to infer repeated work—finding water and food, keeping belongings together, watching a toddler and an infant, helping children sleep—but not to claim specific illnesses, temperatures, or acts that no witness recorded.',
          ],
          mediaId: 'emigrant-family-on-deck-ferraguti', evidence: 'reconstruction',
        },
        {
          eyebrow: 'Late 1891 · reconstructed passage',
          title: 'A moving household at sea.',
          paragraphs: [
            'The Colombo was a converted cargo vessel carrying hundreds of emigrants in common accommodation. Fosca’s exact compartment and class are unknown. A contemporary image of emigrants on deck can suggest physical closeness, luggage, and exposure, but it cannot stand in as a portrait of her voyage.',
            'The strongest story is already in the arithmetic: two parents kept a household of eight together across an ocean. Care is visible as a necessary structure, even when its individual moments are lost.',
          ],
          mediaId: 'genoa-port-noack-1892', evidence: 'reconstruction',
        },
        {
          eyebrow: '20–23 November 1891 · context and hypothesis',
          title: 'Guanabara under pressure.',
          paragraphs: [
            'A proposed chronology places the Colombo in Rio from 20 November, three days before the First Revolt of the Armada. The coup, naval ultimatum, Deodoro’s resignation, and Floriano’s accession are documented public events.',
            'What is not yet directly documented is Fosca’s position inside them: whether the family remained aboard, underwent quarantine at Ilha Grande, or experienced each claimed port disruption. Those possibilities belong to the investigation, not to her known testimony.',
          ],
          mediaId: 'rio-port-customs-ferrez', evidence: 'context',
        },
        {
          eyebrow: '15 December 1891 · documented',
          title: 'All eight names arrive together.',
          paragraphs: [
            'Book 031, page 283 records Fosca beside Giuseppe and above the six children. This is the documentary basis for saying the family reached the Brás hostel intact. It is a powerful result without assigning unrecorded heroics to her.',
            'The entry gives Rio de Janeiro as provenance and Tietê as destination. It does not itself prove a 6–7 December landing at Santos or a fifteen-day military and sanitary confinement.',
          ],
          mediaId: 'panzonato-hospedaria-1891', evidence: 'documented',
        },
        {
          eyebrow: '3 August 1927 · documented with conflict',
          title: 'Fosca Morro in Capivari.',
          paragraphs: [
            'Her death certificate records Fosca Morro, married to José Pansonatto, dying in Capivari from chronic nephritis. It gives her age as seventy and leaves her parents unnamed.',
            'That age does not align cleanly with the approximate birth year inferred elsewhere. The disagreement remains visible: records are not merely containers of answers, but traces made by different people at different times.',
          ],
          mediaId: 'fosca-death-1927', evidence: 'documented',
        },
      ],
    },
    'pt-br': {
      note: 'Fosca não deixou diário conhecido. Sua história é construída a partir dos documentos que a nomeiam e de inferências cuidadosamente marcadas sobre o cuidado de seis filhos durante a migração.',
      sections: [
        {
          eyebrow: '20 de novembro de 1881 · documentado',
          title: 'O primeiro registro seguro de Fosca.',
          paragraphs: [
            'O registro de casamento de Mira identifica Fosca Moro, de 21 anos, filha de Andrea Moro e da falecida Pasqua Toffano, casando-se com Giuseppe Panzonato. Não há, no arquivo de trabalho, um nascimento verificado de Fosca; por isso, a data exata às vezes atribuída ao seu nascimento é menos segura.',
            'Esse limite é importante. Mantém a biografia ligada aos documentos preservados, sem transformar silenciosamente uma data de árvore familiar em certeza.',
          ],
          mediaId: 'giuseppe-fosca-marriage-1881', evidence: 'documented',
        },
        {
          eyebrow: '1881–1891 · registro familiar',
          title: 'Seis filhos, seis idades diferentes.',
          paragraphs: [
            'No assento de 1891, Fosca tem trinta anos e viaja com Luigia, dez; Catarina, nove; Candida, sete; Luigi, cinco; Domenico, três; e Eugenio, um. A presença de todos no registro de São Paulo é documentada. O trabalho cotidiano que tornou isso possível não é.',
            'É razoável inferir tarefas repetidas — buscar água e comida, manter bagagens juntas, vigiar uma criança de três anos e um bebê, ajudar os filhos a dormir —, mas não afirmar doenças, temperaturas ou gestos específicos que nenhuma testemunha registrou.',
          ],
          mediaId: 'emigrant-family-on-deck-ferraguti', evidence: 'reconstruction',
        },
        {
          eyebrow: 'Fim de 1891 · travessia reconstruída',
          title: 'Uma casa em movimento no mar.',
          paragraphs: [
            'O Colombo era um cargueiro convertido que transportava centenas de emigrantes em alojamento comum. O compartimento e a classe exatos de Fosca são desconhecidos. Uma imagem contemporânea de emigrantes no convés pode sugerir proximidade física, bagagens e exposição, mas não substitui um retrato de sua viagem.',
            'A história mais forte já está na aritmética: dois pais mantiveram uma família de oito pessoas unida através do oceano. O cuidado é visível como estrutura necessária, mesmo quando seus momentos individuais se perderam.',
          ],
          mediaId: 'genoa-port-noack-1892', evidence: 'reconstruction',
        },
        {
          eyebrow: '20–23 de novembro de 1891 · contexto e hipótese',
          title: 'A Guanabara sob pressão.',
          paragraphs: [
            'Uma cronologia proposta situa o Colombo no Rio a partir de 20 de novembro, três dias antes da Primeira Revolta da Armada. O golpe, o ultimato naval, a renúncia de Deodoro e a posse de Floriano são acontecimentos públicos documentados.',
            'O que ainda não está documentado diretamente é a posição de Fosca dentro deles: se a família permaneceu a bordo, passou por quarentena na Ilha Grande ou viveu cada interrupção portuária alegada. Essas possibilidades pertencem à investigação, não ao testemunho conhecido dela.',
          ],
          mediaId: 'rio-port-customs-ferrez', evidence: 'context',
        },
        {
          eyebrow: '15 de dezembro de 1891 · documentado',
          title: 'Os oito nomes chegam juntos.',
          paragraphs: [
            'O livro 031, página 283, registra Fosca ao lado de Giuseppe e acima dos seis filhos. Essa é a base documental para dizer que a família chegou inteira à Hospedaria do Brás. É um resultado poderoso sem atribuir a ela heroísmos não registrados.',
            'O assento informa procedência do Rio de Janeiro e destino a Tietê. Por si só, não comprova desembarque em Santos nos dias 6–7 de dezembro nem quinze dias de confinamento militar e sanitário.',
          ],
          mediaId: 'panzonato-hospedaria-1891', evidence: 'documented',
        },
        {
          eyebrow: '3 de agosto de 1927 · documentado com divergência',
          title: 'Fosca Morro em Capivari.',
          paragraphs: [
            'Sua certidão de óbito registra Fosca Morro, casada com José Pansonatto, falecida em Capivari por nefrite crônica. Informa setenta anos de idade e não identifica os pais.',
            'Essa idade não coincide perfeitamente com o ano aproximado de nascimento inferido em outras fontes. A divergência permanece visível: registros não são apenas recipientes de respostas, mas vestígios produzidos por pessoas diferentes em momentos diferentes.',
          ],
          mediaId: 'fosca-death-1927', evidence: 'documented',
        },
      ],
    },
  },
};

export function getPersonStory(personId: string, locale: Locale): PersonStory | undefined {
  return stories[personId]?.[locale];
}
