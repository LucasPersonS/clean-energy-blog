export interface Question {
    id?: number;
    texto: string;
    opcoes: string[];
    respostaCorreta: number;
  }
  
  export interface Quiz {
    id?: number;
    titulo: string;
    descricao: string;
    perguntas: Question[];
  }
  
  export interface ErrorMessage {
    mensagem: string;
  }