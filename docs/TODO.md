
# Módulo de jogadores
[x] Deve ser possível cadastrar jogadores
[x] No cadastro não deve ser retornada a senha
[x] O score dos jogadores deve ser entre 1 e 5
[x] Deve ser possível listar jogadores
[ ] Deve ser possível alterar os dados de jogadores
[ ] Deve ser possível remover jogadores
[ ] Deve ser possível exportar um JSON com as informações de um grupo, incluindo as dos jogadores
[ ] Deve ser possível importar um arquivo JSON com as informações do grupo, incluindo as dos jogadores
[ ] Deve ser informado o tipo de pagamento do jogador ao adiciona-lo no grupo

# Módulo de contas de usuários
[ ] Deve existir um usuário administrador do sistema com todas as permissões
[x] Deve ser criada automaticamente uma conta no cadastro do jogador, utilizando o telefone como login e '12345678' como senha padrão
[ ] Deve ser possível autenticar e receber um token JWT que será utilizado para autorização
[ ] Deve ser possível criar usuários master

# Módulo de grupos
[x] Deve ser possível criar grupos
[x] O usuário que criou o grupo deve se tornar administrador nele
[x] Deve ser possível adicionar jogadores ao grupo
[ ] Ao adicionar um jogador ele deve ter as permissões de Jogador
[ ] Somente administradores podem adicionar jogadores ao grupo
[ ] Deve ser possível tornar jogadores administradores do grupo
[ ] Somente administradores podem dar permissão de jogador para outros jogadores

# Módulo de partidas
[ ] Deve ser possível criar partidas nos grupos
[ ] Somente administradores podem criar partidas
[ ] Deve ser possível listar partidas
[ ] Deve ser possível um jogador confirmar ou não a própria presença na partida
[ ] Deve ser possível vincular um árbitro à partida

# Módulo de árbitros
[ ] Deve ser possível cadastrar árbitros

# Módulo de finanças
[ ] Deve ser possível receber pagamentos dos jogadores (diaristas ou mensalistas)
[ ] Só administradores do grupo podem receber pagamentos
