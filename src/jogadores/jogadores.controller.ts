/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common'
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { JogadoresService } from './jogadores.service'

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) { }

  @Post()
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    await this.jogadoresService.criarAtualizarJogador(criarJogadorDto)
  }

  @Get()
  async consultarTodosJogadores() {
    return await this.jogadoresService.consultarTodosJogadores()
  }
}
