'use client';

import React, { useEffect, useRef } from 'react';
import { IdleAnimation, SkinViewer, WalkingAnimation } from 'skinview3d';

interface MinecraftSkinViewerProps {
  skinUrl: string;
  width?: number;
  height?: number;
  model?: 'auto' | 'classic' | 'slim';
  autoRotate?: boolean;
  walk?: boolean;
  mouseControl?: boolean; // マウス追従のON/OFF制御用（デフォルトtrue）
}

const MinecraftSkinViewer: React.FC<MinecraftSkinViewerProps> = ({
  skinUrl,
  width = 300,
  height = 400,
  model = 'auto',
  autoRotate = true,
  walk = false,
  mouseControl = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<SkinViewer | null>(null);

  // 1. 初期化とクリーンアップ、イベントリスナーの設定
  useEffect(() => {
    if (!canvasRef.current) return;

    // ビューワーインスタンス生成
    const viewer = new SkinViewer({
      canvas: canvasRef.current,
      width: width,
      height: height,
    });

    // 基本設定
    viewer.nameTag = "Megaak";
    viewer.zoom = 0.7;

    // インスタンスをRefに保存
    viewerRef.current = viewer;
    viewer.controls.enableZoom = false;

    // --- マウス追従ロジック ---
    const handleMouseMove = (event: MouseEvent) => {
      if (!mouseControl || !viewer.playerObject) return;

      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2 - 150;
      const mouseX = event.clientX - centerX;
      const mouseY = event.clientY - centerY;

      // 角度計算 (感度調整はここの数値を変更)
      const yRotation = (mouseX / window.innerWidth) * Math.PI; // 左右
      const xRotation = (mouseY / window.innerHeight) * Math.PI; // 上下

      // 首の可動域制限 (約30度)
      const limit = 0.7; 
      
      // 頭を回転させる
      const head = viewer.playerObject.skin.head;
      head.rotation.y = Math.max(-limit, Math.min(limit, yRotation));
      head.rotation.x = Math.max(-limit, Math.min(limit, xRotation));
    };

    // イベントリスナー登録
    window.addEventListener('mousemove', handleMouseMove);

    // クリーンアップ
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      viewer.dispose();
      viewerRef.current = null;
    };
  }, []); // 初回のみ実行

  // 2. プロパティ変更時の更新処理 (スキン読み込み・アニメーション・回転)
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    // --- モデル型の変換処理 ---
    let modelType: "auto-detect" | "default" | "slim";
    switch (model) {
      case 'slim':
        modelType = 'slim';
        break;
      case 'classic':
        modelType = 'default';
        break;
      case 'auto':
      default:
        modelType = 'auto-detect';
        break;
    }

    // --- スキンのロードとアウター強制表示 ---
    // ※ ここで .then を使わないとアウターが表示されません
    viewer.loadSkin(skinUrl, { model: modelType }).then(() => {
      const skinParts = viewer.playerObject?.skin;
      if (!skinParts) return;

      // 全パーツのアウターレイヤーを強制的にON
      skinParts.head.outerLayer.visible = true;
      skinParts.body.outerLayer.visible = true;
      skinParts.leftArm.outerLayer.visible = true;
      skinParts.rightArm.outerLayer.visible = true;
      skinParts.leftLeg.outerLayer.visible = true;
      skinParts.rightLeg.outerLayer.visible = true;
    });

    // --- アニメーション設定の更新 ---
    if (walk) {
      // 既にアニメーションが設定されていなければ設定
      if (!viewer.animation) {
        viewer.animation = new WalkingAnimation();
      }
    } else {
      // walkがfalseならアニメーションを停止・解除
      viewer.animation = new IdleAnimation();
    }

    // --- その他の設定更新 ---
    viewer.setSize(width, height);
    
    if (autoRotate) {
      viewer.autoRotate = true;
      viewer.autoRotateSpeed = 0.8;
    } else {
      viewer.autoRotate = false;
    }

  }, [skinUrl, width, height, model, autoRotate, walk, mouseControl]);

  return (
    <canvas 
      ref={canvasRef} 
      className="" // 必要に応じて背景色等を変更
      style={{ cursor: mouseControl ? 'pointer' : 'default' }} // マウス追従時はカーソル変更
    />
  );
};

export default MinecraftSkinViewer;