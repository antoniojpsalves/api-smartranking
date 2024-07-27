import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { Jogador } from './interfaces/jogador.interface'

import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = []

  private readonly logger = new Logger(JogadoresService.name)

  async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criaJogadorDto

    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    )

    if (jogadorEncontrado) {
      return this.atualizar(jogadorEncontrado, criaJogadorDto)
    }

    await this.criar(criaJogadorDto)
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadores
  }

  private criar(criaJogadorDto: CriarJogadorDto): void {
    const { nome, telefoneCelular, email } = criaJogadorDto

    const jogador: Jogador = {
      _id: uuidv4(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'www.github.com/antoniojpsalves.png',
    }

    this.logger.log(`criaJogadorDto ${JSON.stringify(jogador)}`)

    this.jogadores.push(jogador)
  }

  private atualizar(
    jogadorEncontrado: Jogador,
    criarJogadorDto: CriarJogadorDto,
  ) {
    const { nome } = criarJogadorDto

    jogadorEncontrado.nome = nome
  }

  async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email === email,
    )

    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `Jogador com o e-mail: ${email}, não encontrado!`,
      )
    }
    return jogadorEncontrado
  }

  async deletarJogador(email: string) {
    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    )

    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `Jogador com o e-mail: ${email}, não encontrado! Impossível deletar.`,
      )
    }

    this.jogadores = this.jogadores.filter((jogador) => jogador.email !== email)
  }
}
