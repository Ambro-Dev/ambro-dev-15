---
title: "Efektywna automatyzacja CI/CD z Jenkins i GitHub Actions"
excerpt: "Jak zbudować skuteczny pipeline CI/CD wykorzystując Jenkins i GitHub Actions? Poznaj najlepsze praktyki i gotowe rozwiązania."
date: "2024-03-25"
author: "Ambro-Dev"
coverImage: "/images/blog/cicd-automation.webp"
tags: ["DevOps", "CI/CD", "Jenkins", "GitHub Actions", "Automatyzacja"]
---

# Efektywna automatyzacja CI/CD z Jenkins i GitHub Actions

Automatyzacja procesów CI/CD (Continuous Integration / Continuous Deployment) jest kluczowym elementem nowoczesnego cyklu wytwarzania oprogramowania. W tym artykule skupię się na dwóch popularnych narzędziach: Jenkins i GitHub Actions.

## Jenkins - klasyk wśród narzędzi CI/CD

Jenkins to jedno z najbardziej dojrzałych narzędzi CI/CD, oferujące:

- Ogromną elastyczność konfiguracji
- Bogatą bazę wtyczek
- Możliwość uruchamiania na własnej infrastrukturze

Przykładowy Jenkinsfile dla prostego projektu:

```groovy
pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh './deploy.sh'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}
```

## GitHub Actions - nowoczesne podejście

GitHub Actions integruje się bezpośrednio z repozytorium i oferuje:

- Prostą konfigurację w plikach YAML
- Integrację z ekosystemem GitHub
- Marketplace z gotowymi akcjami

Przykładowy workflow dla aplikacji Node.js:

```yaml
name: Node.js CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build_and_test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    - run: npm ci
    - run: npm run build
    - run: npm test

  deploy:
    needs: build_and_test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    - name: Deploy to production
      run: |
        echo "Deploying to production server..."
        # Tutaj umieść skrypt deployu
```

## Porównanie Jenkins i GitHub Actions

| Funkcjonalność | Jenkins | GitHub Actions |
|----------------|---------|---------------|
| Hosting | Self-hosted | Cloud (GitHub) |
| Konfiguracja | Jenkinsfile (Groovy) | YAML |
| Ekosystem | Wtyczki | Marketplace Actions |
| Integracja z SCM | Wymaga konfiguracji | Natywna dla GitHub |
| Dojrzałość | Bardzo wysoka | Średnia |
| Skalowalność | Bardzo wysoka | Ograniczona |

## Kiedy wybrać które narzędzie?

- **Jenkins** sprawdza się lepiej w przypadku:
  - Złożonych, wieloetapowych pipeline'ów
  - Konieczności pełnej kontroli nad infrastrukturą
  - Integracji z wieloma systemami
  
- **GitHub Actions** jest lepszym wyborem gdy:
  - Twój kod jest już na GitHubie
  - Potrzebujesz szybkiego i prostego wdrożenia CI/CD
  - Cenisz sobie prostotę konfiguracji

## Podsumowanie

Wybór między Jenkins a GitHub Actions powinien być podyktowany specyfiką projektu, zespołu i istniejącej infrastruktury. Warto pamiętać, że oba narzędzia można również stosować komplementarnie, wykorzystując mocne strony każdego z nich.

W następnym artykule opiszę, jak skonfigurować wieloetapowy pipeline Jenkins dla aplikacji opartej na mikrousługach.

---

Do zobaczenia wkrótce,
Ambro-Dev 