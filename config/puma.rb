threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
threads threads_count, threads_count

env = ENV.fetch("RAILS_ENV") { "production" }
environment env
if env == "production"
  workers 2
  daemonize true
  bind 'unix://tmp/jargon.sock'
  state_path 'tmp/puma.state'
  stdout_redirect 'log/puma.log', 'log/puma.log', true
else
  port ENV.fetch("PORT") { 3000 }
end
prune_bundler
pidfile 'tmp/puma.pid'

plugin :tmp_restart
