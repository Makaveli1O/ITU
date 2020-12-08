#
# PlayerStatistics makefile
#
#
PROJECT = "PlayerStatistics"

install: ;@echo "Installing ${PROJECT} independencies...\n"; \
	npm install

clean: ;@echo "Removing node_modules... \n"
	rm -rf node_modules

run: ;@echo "Starting ${PROJECT} using EXPO CLI \n"; \
	expo start
