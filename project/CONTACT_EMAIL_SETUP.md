# Configuration de l'envoi du formulaire de contact

Le formulaire envoie les messages depuis la route serveur `app/api/contact/route.ts` avec Resend. La clé API et les adresses d'envoi et de réception restent côté serveur ; ne préfixez jamais ces variables par `NEXT_PUBLIC_`.

## 1. Configurer Resend

1. Créez un compte sur [Resend](https://resend.com/) et générez une clé API.
2. Pour envoyer depuis votre propre adresse de domaine, ajoutez votre domaine dans Resend puis publiez les enregistrements DNS demandés (notamment SPF et DKIM). Attendez que Resend confirme la vérification du domaine.
3. Choisissez une adresse expéditrice sur ce domaine, par exemple `contact@votre-domaine.com`. L'adresse du visiteur est utilisée comme `Reply-To`, pas comme expéditeur.
4. Tant que le domaine n'est pas vérifié, Resend peut limiter l'envoi à son expéditeur de test et à l'adresse e-mail du propriétaire du compte. Vérifiez les restrictions actuelles du compte avant un test.

## 2. Configurer les variables en local

Dans le dossier `project`, copiez `.env.example` vers `.env.local`, puis remplacez ses valeurs :

```env
RESEND_API_KEY=re_votre_cle_privee
CONTACT_TO_EMAIL=votre-adresse-de-reception@example.com
RESEND_FROM_EMAIL="Portfolio <contact@votre-domaine.com>"
```

`CONTACT_TO_EMAIL` est l'adresse qui reçoit les messages. `RESEND_FROM_EMAIL` doit être une adresse autorisée par votre compte Resend, idéalement sur le domaine vérifié. `.env.local` est ignoré par Git : ne partagez et ne publiez pas ce fichier.

## 3. Lancer et tester

Depuis `project` :

```bash
npm install
npm run dev
```

Ouvrez l'adresse locale affichée par Next.js, soumettez le formulaire avec un vrai e-mail de réponse, puis vérifiez :

- la confirmation n'apparaît que lorsque la route a reçu une confirmation de Resend ;
- en cas de configuration manquante, de limite atteinte ou d'erreur Resend, le formulaire affiche une erreur et ne prétend pas que le message est envoyé ;
- le message reçu contient nom, e-mail, téléphone éventuel, sujet et contenu ; le bouton « Répondre » doit utiliser l'adresse du visiteur.

Vérifiez d'abord la boîte de réception, puis les dossiers Spam/Indésirables et Promotions. Le tableau de bord Resend permet également de contrôler le statut de l'e-mail et les éventuels motifs de rejet. La réponse positive de l'API confirme l'acceptation par Resend, pas à elle seule la livraison finale dans la boîte du destinataire.

## 4. Déployer sur Netlify

Dans les paramètres du site Netlify, ajoutez les trois variables `RESEND_API_KEY`, `CONTACT_TO_EMAIL` et `RESEND_FROM_EMAIL` pour le contexte de déploiement concerné, puis relancez un déploiement. Ne mettez pas la clé dans le code, les paramètres de compilation publics ou une variable `NEXT_PUBLIC_*`.

La limitation anti-spam incluse combine un champ piège, un délai minimal de remplissage et une limite en mémoire de cinq envois par adresse IP sur dix minutes. La limite en mémoire est une protection best-effort ; les fonctions serverless peuvent redémarrer ou avoir plusieurs instances. Pour un trafic important, configurez en plus une limitation centralisée auprès de l'hébergeur ou un service spécialisé.
